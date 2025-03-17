import Fuse from "fuse.js";
import { getLeyesProyectos, getBlogPosts } from "./notion";
import { getExtraDocuments } from "./extraDocs";

export async function getContextForQuery(query) {
  try {
    // 1. Obtener los proyectos de ley y blogs desde Notion
    const leyes = await getLeyesProyectos();
    const blogs = await getBlogPosts();

    // 2. Obtener documentos estáticos (biografía y trayectoria)
    const extraDocs = getExtraDocuments();

    // 3. Extraer filtros de año de la consulta
    let yearFilter = null;
    const yearMatch = query.match(/20\d\d/); // Busca años como 2022, 2023, 2024, 2025
    if (yearMatch) {
      yearFilter = yearMatch[0];
      console.log(`Filtro de año detectado: ${yearFilter}`);
    }

    // 4. Extraer filtros de estado (publicado, en comisión, etc.)
    let estadoFilter = null;
    if (/public[oa]d[oa]s?|promulgad[oa]s?/i.test(query)) {
      estadoFilter = "publicado";
    } else if (/comisi[óo]n|comite/i.test(query)) {
      estadoFilter = "comisión";
    } else if (/tr[áa]mite|proceso|pendiente/i.test(query)) {
      estadoFilter = "trámite";
    } else if (/archivad[oa]s?|rechazad[oa]s?/i.test(query)) {
      estadoFilter = "archivado";
    }
    
    if (estadoFilter) {
      console.log(`Filtro de estado detectado: ${estadoFilter}`);
    }

    // 5. Casos especiales para consultas directas
    if (query === "proyectos de ley completos") {
      return leyes.map(l => (
        `📜 PROYECTO DE LEY: ${l.titulo}\n\n${l.descripcion}\n\nFecha: ${l.fecha}\nEstado: ${l.estado}`
      )).join("\n\n---\n\n");
    }
    
    if (query === "biografía completa" || /^biografia completa$/i.test(query)) {
      const bioDoc = extraDocs.find(doc => doc.type === "biografia");
      return bioDoc ? bioDoc.text : "No se encontró información biográfica.";
    }
    
    if (query === "trayectoria política completa" || /^trayectoria (politica )?completa$/i.test(query)) {
      const trayectoriaDoc = extraDocs.find(doc => doc.type === "trayectoria");
      return trayectoriaDoc ? trayectoriaDoc.text : "No se encontró información sobre la trayectoria política.";
    }

    // 6. Construir la lista de documentos
    const documents = [
      ...extraDocs.map(doc => ({
        text: doc.text,
        source: doc.type,
        type: doc.type,
        fecha: null,
        estado: null
      })),
      ...leyes.map(l => {
        // Extraer el año de la fecha
        const fechaObj = new Date(l.fecha);
        const year = fechaObj.getFullYear();
        
        return {
          text: `📜 PROYECTO DE LEY: ${l.titulo}\n\n${l.descripcion}\n\nFecha: ${l.fecha}\nEstado: ${l.estado}`,
          source: "Ley: " + l.titulo,
          type: "ley",
          fecha: l.fecha,
          year: year,
          estado: l.estado.toLowerCase()
        };
      }),
      ...blogs.map(b => {
        // Extraer el año de la fecha del blog
        const fechaObj = new Date(b.date);
        const year = fechaObj.getFullYear();
        
        return {
          text: `📝 ARTÍCULO: ${b.title}\n\n${b.excerpt}\n\nFecha de publicación: ${b.date}`,
          source: "Blog: " + b.title,
          type: "blog",
          fecha: b.date,
          year: year,
          estado: null
        };
      }),
    ];

    console.log(`Documentos unificados: ${documents.length} documentos cargados`);

    // 7. Casos especiales por tipo de consulta
    
    // 7.1. Caso: la consulta parece ser sobre proyectos de ley
    if (/proyectos?|ley(es)?|iniciativa|propuesta|legisla/i.test(query)) {
      console.log("La consulta parece ser sobre proyectos de ley");
      
      // Filtrar leyes según los filtros detectados
      let leyesFiltradas = documents.filter(doc => doc.type === "ley");
      
      // Aplicar filtro de año si existe
      if (yearFilter) {
        leyesFiltradas = leyesFiltradas.filter(doc => doc.year === parseInt(yearFilter));
        console.log(`Aplicando filtro de año ${yearFilter}: ${leyesFiltradas.length} leyes encontradas`);
      }
      
      // Aplicar filtro de estado si existe
      if (estadoFilter) {
        leyesFiltradas = leyesFiltradas.filter(doc => 
          doc.estado && doc.estado.toLowerCase().includes(estadoFilter.toLowerCase())
        );
        console.log(`Aplicando filtro de estado ${estadoFilter}: ${leyesFiltradas.length} leyes encontradas`);
      }
      
      // Si es una consulta general sobre proyectos o hay filtros específicos, devolvemos todos los filtrados
      if (/listad?o?|todo|completo|general|todos|ver/i.test(query) || yearFilter || estadoFilter) {
        // Si hay demasiados resultados, podríamos limitarlos a un número razonable
        const maxResults = 15; // Ajustar según necesidades
        const leyesAMostrar = leyesFiltradas.length > maxResults ? leyesFiltradas.slice(0, maxResults) : leyesFiltradas;
        
        let resultMessage = "";
        
        if (leyesFiltradas.length > 0) {
          if (yearFilter && estadoFilter) {
            resultMessage = `Encontré ${leyesFiltradas.length} proyectos de ley del año ${yearFilter} con estado "${estadoFilter}":\n\n`;
          } else if (yearFilter) {
            resultMessage = `Encontré ${leyesFiltradas.length} proyectos de ley del año ${yearFilter}:\n\n`;
          } else if (estadoFilter) {
            resultMessage = `Encontré ${leyesFiltradas.length} proyectos de ley con estado "${estadoFilter}":\n\n`;
          } else {
            resultMessage = `Aquí tienes ${leyesFiltradas.length} proyectos de ley:\n\n`;
          }
          
          if (leyesFiltradas.length > maxResults) {
            resultMessage += `Mostrando los primeros ${maxResults} resultados:\n\n`;
          }
          
          resultMessage += leyesAMostrar.map(doc => doc.text).join("\n\n---\n\n");
          return resultMessage;
        } else {
          if (yearFilter && estadoFilter) {
            return `No se encontraron proyectos de ley del año ${yearFilter} con estado "${estadoFilter}".`;
          } else if (yearFilter) {
            return `No se encontraron proyectos de ley del año ${yearFilter}.`;
          } else if (estadoFilter) {
            return `No se encontraron proyectos de ley con estado "${estadoFilter}".`;
          } else {
            return "No se encontraron proyectos de ley en la base de datos.";
          }
        }
      }
    }

    // 7.2. Caso: la consulta parece ser sobre biografía
    if (/biograf(i|í)a|vida|historia|qui(e|é)n es|estudi(o|ó)|form(o|ó)|educa(c|s)i(o|ó)n/i.test(query)) {
      console.log("La consulta parece ser sobre biografía");
      const bioDoc = documents.find(doc => doc.type === "biografia");
      if (bioDoc) {
        return bioDoc.text;
      }
    }

    // 7.3. Caso: la consulta parece ser sobre trayectoria política
    if (/trayectoria|carrera|pol(i|í)tic|experiencia|trabajo|labor|cargo/i.test(query)) {
      console.log("La consulta parece ser sobre trayectoria política");
      const trayectoriaDoc = documents.find(doc => doc.type === "trayectoria");
      if (trayectoriaDoc) {
        return trayectoriaDoc.text;
      }
    }

    // 8. Configurar Fuse.js para búsqueda por relevancia
    const fuse = new Fuse(documents, {
      keys: ["text"],
      threshold: 0.6,
      includeScore: true,
    });
    
    // 9. Buscar coincidencias
    const results = fuse.search(query);
    console.log(`Resultados de Fuse: ${results.length} coincidencias encontradas`);

    // 10. Casos especiales para cuando no hay resultados
    if (results.length === 0) {
      // 10.1. Si no hay resultados y la consulta es sobre leyes
      if (/proyectos?|ley(es)?|iniciativa/i.test(query)) {
        // Determinar si filtros podrían estar causando cero resultados
        if (yearFilter || estadoFilter) {
          let mensaje = "No encontré proyectos de ley que coincidan con ";
          if (yearFilter && estadoFilter) {
            mensaje += `el año ${yearFilter} y estado "${estadoFilter}". `;
          } else if (yearFilter) {
            mensaje += `el año ${yearFilter}. `;
          } else if (estadoFilter) {
            mensaje += `el estado "${estadoFilter}". `;
          }
          
          // Sugerir proyectos recientes como alternativa
          const recentLaws = documents
            .filter(doc => doc.type === "ley")
            .slice(0, 5)
            .map(doc => doc.text)
            .join("\n\n---\n\n");
            
          if (recentLaws) {
            return mensaje + "Aquí tienes algunos proyectos de ley recientes que podrían interesarte:\n\n" + recentLaws;
          }
          return mensaje;
        } else {
          // Mostrar los 5 proyectos más recientes si no hay filtros específicos
          const recentLaws = documents
            .filter(doc => doc.type === "ley")
            .slice(0, 5)
            .map(doc => doc.text)
            .join("\n\n---\n\n");
            
          if (recentLaws) {
            console.log("No hay coincidencias exactas. Mostrando proyectos recientes.");
            return "No encontré coincidencias exactas para tu consulta, pero aquí tienes algunos proyectos de ley recientes del congresista Héctor Valer:\n\n" + recentLaws;
          }
        }
      }
      
      // 10.2. Si no hay resultados y la consulta es sobre biografía
      if (/biograf(i|í)a|vida|historia|qui(e|é)n es/i.test(query)) {
        const bioDoc = documents.find(doc => doc.type === "biografia");
        if (bioDoc) {
          console.log("No hay coincidencias exactas. Mostrando biografía completa.");
          return "Aquí tienes la biografía del congresista Héctor Valer:\n\n" + bioDoc.text;
        }
      }
      
      // 10.3. Si no hay resultados y la consulta es sobre trayectoria
      if (/trayectoria|carrera|pol(i|í)tic|experiencia/i.test(query)) {
        const trayectoriaDoc = documents.find(doc => doc.type === "trayectoria");
        if (trayectoriaDoc) {
          console.log("No hay coincidencias exactas. Mostrando trayectoria completa.");
          return "Aquí tienes la trayectoria política del congresista Héctor Valer:\n\n" + trayectoriaDoc.text;
        }
      }

      // 10.4. Si no se encontraron resultados, mensaje genérico
      return "No se encontró información específica relacionada con tu consulta en la base de datos. Sin embargo, puedo proporcionarte información general sobre la labor del congresista Héctor Valer o ayudarte con otra consulta.";
    }

    // 11. Aplicar filtros a los resultados de Fuse si son aplicables
    let filteredResults = results;
    
    if ((yearFilter || estadoFilter) && /proyectos?|ley(es)?|iniciativa/i.test(query)) {
      filteredResults = results.filter(r => {
        const item = r.item;
        let matches = item.type === "ley";
        
        if (yearFilter && item.year) {
          matches = matches && (item.year === parseInt(yearFilter));
        }
        
        if (estadoFilter && item.estado) {
          matches = matches && item.estado.toLowerCase().includes(estadoFilter.toLowerCase());
        }
        
        return matches;
      });
      
      console.log(`Después de aplicar filtros: ${filteredResults.length} resultados`);
      
      // Si no hay resultados después de filtrar, dar un mensaje específico
      if (filteredResults.length === 0) {
        let mensaje = "No encontré proyectos de ley que coincidan con tu búsqueda";
        if (yearFilter && estadoFilter) {
          mensaje += ` del año ${yearFilter} y estado "${estadoFilter}".`;
        } else if (yearFilter) {
          mensaje += ` del año ${yearFilter}.`;
        } else if (estadoFilter) {
          mensaje += ` con estado "${estadoFilter}".`;
        } else {
          mensaje += ".";
        }
        return mensaje;
      }
    }

    // 12. Retornar hasta 10 resultados (aumentado de 5)
    const bestResults = filteredResults
      .slice(0, 10)
      .map(r => r.item.text)
      .join("\n\n---\n\n");
    
    return bestResults;
  } catch (error) {
    console.error("Error en getContextForQuery:", error);
    return "Ocurrió un error al buscar la información. Por favor, intenta con otra consulta.";
  }
}