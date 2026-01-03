exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const GITHUB_OWNER = process.env.GITHUB_OWNER || 'lakotafox';
        const GITHUB_REPO = process.env.GITHUB_REPO || 'reallycoolhair';

        if (!GITHUB_TOKEN) {
            console.error('GITHUB_TOKEN not configured');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'GitHub token not configured' })
            };
        }

        const { action, client } = JSON.parse(event.body);

        if (action !== 'add-client' || !client) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid request' })
            };
        }

        // Fetch current gallery-data.json from GitHub
        const getResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/gallery-data.json`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        let galleryData = { clients: [], lastUpdated: new Date().toISOString() };
        let sha = null;

        if (getResponse.ok) {
            const fileData = await getResponse.json();
            sha = fileData.sha;
            const content = Buffer.from(fileData.content, 'base64').toString('utf8');
            galleryData = JSON.parse(content);
        }

        // Add new client at the beginning (newest first)
        galleryData.clients.unshift(client);
        galleryData.lastUpdated = new Date().toISOString();

        // Encode content
        const newContent = Buffer.from(JSON.stringify(galleryData, null, 2)).toString('base64');

        // Update file on GitHub
        const updateBody = {
            message: `Add new client photos - ${new Date().toLocaleDateString()}`,
            content: newContent,
            branch: 'master'
        };

        if (sha) {
            updateBody.sha = sha;
        }

        const updateResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/gallery-data.json`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateBody)
            }
        );

        if (!updateResponse.ok) {
            const error = await updateResponse.text();
            console.error('GitHub update failed:', error);
            return {
                statusCode: updateResponse.status,
                headers,
                body: JSON.stringify({ error: 'Failed to update GitHub' })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, message: 'Client added successfully' })
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
