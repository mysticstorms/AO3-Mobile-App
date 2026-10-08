const cheerio = require('cheerio');

async function getAO3pubLink(workId) {
    // CONSTRUCT THE TARGET URL
    
    /* NOTE: Appending '?view_adult=true' bypasses AO3's content warning page.
    Without this, your scraper will get stuck on the "Proceed" screen */
    const url = `https://archiveofourown.org/works/${workId}?view_adult=true`;

    try {
        // FETCH THE RAW HTML OF THE FIC'S MAIN PAGE
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }

        const html = await response.text();

        // LOAD HTML INTO CHEERIO FOR PARSING
        const $ = cheerio.load(html);

        // LOCATE EPUB DOWNLOAD LINK
        let epubRelatedLinks = null;

        // AO3 structures their download button as a list under the '.download' class
        $('.download li a').each((index, element) => {
            if ($(element).text().trim() == "EPUB") {
                epubRelatedLinks = $(element).attr('href');
            }
        });
        
        if (!epubRelatedLinks) {
            throw new Error('EPUB link not found. The work might be locked to registered users or deleted.');
        }

        const fullEpubUrl = `https://archiveofourown.org${epubRelativePath}`;
        return fullEpubUrl;
    }
    catch (error) {
        console.error(`Error scraping Work ID ${workId}:`, error.message);
        return null;
    }
}

// --- Example Usage ---
// This is the Work ID for a public fic. You can find this number in any AO3 URL.
const sampleWorkId = '1234567'; // Replace with a valid Work ID

getAO3pubLink(sampleWorkId).then(link => {
    if (link) {
        console.log('\nSuccess! Found EPUB Link:');
        console.log(link);
        console.log('\nTo download the file, make a standard GET request to this URL and save the response stream as a .epub file.');
    }
});
