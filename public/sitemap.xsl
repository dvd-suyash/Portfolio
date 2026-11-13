<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Suyash Dwivedi</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #1a1a1a;
            background: #faf6ef;
            margin: 0;
            padding: 40px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 980px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.06);
            border: 1px solid #e8e3d9;
            overflow: hidden;
          }
          .header {
            padding: 36px 36px 24px 36px;
            border-bottom: 1px solid #f0ece3;
          }
          .header h1 {
            margin: 0 0 8px 0;
            font-size: 26px;
            font-weight: 700;
            color: #111111;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .header p {
            margin: 0;
            color: #666666;
            font-size: 14px;
          }
          .stats {
            display: flex;
            gap: 20px;
            padding: 16px 36px;
            background: #fdfbf7;
            border-bottom: 1px solid #f0ece3;
            font-size: 13px;
            color: #555555;
          }
          .stat-badge {
            background: #eef2ff;
            color: #3b82f6;
            padding: 3px 10px;
            border-radius: 20px;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          th {
            text-align: left;
            padding: 14px 20px;
            background: #faf8f4;
            color: #666666;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid #ece7dc;
          }
          td {
            padding: 14px 20px;
            border-bottom: 1px solid #f4f0e6;
            vertical-align: middle;
          }
          tr:hover td {
            background: #fdfbf7;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority-pill {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            background: #e0f2fe;
            color: #0369a1;
          }
          .footer {
            padding: 20px 36px;
            background: #faf8f4;
            font-size: 12px;
            color: #888888;
            text-align: center;
            border-top: 1px solid #ece7dc;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap · Suyash Dwivedi</h1>
            <p>Generated automatically for Googlebot, Bing, and web indexing crawlers according to the <a href="https://www.sitemaps.org" target="_blank">Sitemaps.org Protocol</a>.</p>
          </div>
          <div class="stats">
            <div>Total Indexed URLs: <span class="stat-badge"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span></div>
            <div>Primary Domain: <strong>https://suyashdwivedi.in</strong></div>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 50%;">URL Location</th>
                <th style="width: 12%;">Priority</th>
                <th style="width: 15%;">Change Frequency</th>
                <th style="width: 23%;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="priority-pill">
                      <xsl:value-of select="sitemap:priority"/>
                    </span>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="footer">
            Official Sitemap of Suyash Dwivedi · Computer Science Engineer &amp; Full-Stack AI Developer
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
