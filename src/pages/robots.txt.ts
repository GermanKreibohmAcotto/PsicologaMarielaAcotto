import type { APIRoute } from 'astro';

// Endpoint dinámico en vez de un archivo estático: así la URL del sitemap
// siempre coincide con "site" de astro.config.mjs, sin poder desincronizarse.
export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('sitemap-index.xml', site).toString();
	const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
