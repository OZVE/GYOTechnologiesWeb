/**
 * Extrae el contexto de la página actual para enviar al backend
 * Compila texto con: document.title, meta description, h1–h3, y texto visible dentro de <main> (o body si no existe)
 * Excluye nav, footer, script, style, noscript, svg, canvas, iframe
 * Normaliza espacios y recorta a máximo 12.000 caracteres
 */
export function getPageContext(): string {
  try {
    const contextParts: string[] = [];

    // 1. Título de la página
    const title = document.title;
    if (title) {
      contextParts.push(`Título: ${title}`);
    }

    // 2. Meta description
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    if (metaDescription) {
      contextParts.push(`Descripción: ${metaDescription}`);
    }

    // 3. Headings (h1-h3)
    const headings = document.querySelectorAll('h1, h2, h3');
    const headingTexts: string[] = [];
    headings.forEach(heading => {
      const text = heading.textContent?.trim();
      if (text) {
        headingTexts.push(`${heading.tagName.toLowerCase()}: ${text}`);
      }
    });
    if (headingTexts.length > 0) {
      contextParts.push(`Encabezados:\n${headingTexts.join('\n')}`);
    }

    // 4. Contenido principal
    const mainContent = extractMainContent();
    if (mainContent) {
      contextParts.push(`Contenido principal:\n${mainContent}`);
    }

    // 5. URL actual
    contextParts.push(`URL: ${window.location.href}`);

    // Combinar todo el contexto
    let fullContext = contextParts.join('\n\n');

    // Normalizar espacios (múltiples espacios a uno solo, eliminar espacios al inicio/final de líneas)
    fullContext = fullContext
      .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
      .replace(/^\s+|\s+$/gm, '') // Eliminar espacios al inicio/final de líneas
      .replace(/\n\s*\n/g, '\n\n') // Eliminar líneas vacías múltiples
      .trim();

    // Recortar a máximo 12.000 caracteres
    if (fullContext.length > 12000) {
      fullContext = fullContext.substring(0, 12000) + '...';
    }

    return fullContext;
  } catch (error) {
    console.error('Error al extraer contexto de la página:', error);
    return `Error al extraer contexto: ${error instanceof Error ? error.message : 'Error desconocido'}`;
  }
}

/**
 * Extrae el contenido principal de la página
 * Busca primero en <main>, luego en <body> si no existe
 * Excluye elementos no deseados
 */
function extractMainContent(): string {
  // Elementos a excluir
  const excludeSelectors = [
    'nav',
    'footer',
    'script',
    'style',
    'noscript',
    'svg',
    'canvas',
    'iframe',
    '[class*="nav"]',
    '[class*="footer"]',
    '[class*="header"]',
    '[class*="sidebar"]',
    '[class*="menu"]',
    '[aria-hidden="true"]',
    '[role="navigation"]',
    '[role="banner"]',
    '[role="complementary"]',
    '[role="contentinfo"]'
  ];

  // Buscar el contenedor principal
  let mainContainer = document.querySelector('main');
  if (!mainContainer) {
    mainContainer = document.body;
  }

  if (!mainContainer) {
    return '';
  }

  // Clonar el contenedor para no modificar el DOM original
  const clonedContainer = mainContainer.cloneNode(true) as HTMLElement;

  // Remover elementos excluidos
  excludeSelectors.forEach(selector => {
    const elements = clonedContainer.querySelectorAll(selector);
    elements.forEach(element => {
      element.remove();
    });
  });

  // Extraer texto visible
  return extractVisibleText(clonedContainer);
}

/**
 * Extrae solo el texto visible de un elemento
 * Excluye elementos ocultos y scripts
 */
function extractVisibleText(element: HTMLElement): string {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        // Rechazar si el elemento padre está oculto
        const style = window.getComputedStyle(parent);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
          return NodeFilter.FILTER_REJECT;
        }

        // Rechazar scripts y estilos
        if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
          return NodeFilter.FILTER_REJECT;
        }

        // Rechazar si el texto está vacío o solo contiene espacios
        if (!node.textContent?.trim()) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes: string[] = [];
  let node;
  while (node = walker.nextNode()) {
    const text = node.textContent?.trim();
    if (text) {
      textNodes.push(text);
    }
  }

  return textNodes.join(' ');
} 