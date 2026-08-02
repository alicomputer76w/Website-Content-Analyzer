const analyzeBtn = document.getElementById("analyzeBtn");
const urlInput = document.getElementById("url");
const loading = document.getElementById("loading");
const results = document.getElementById("results");

analyzeBtn.addEventListener("click", analyzeWebsite);

async function analyzeWebsite() {

    const url = urlInput.value.trim();

    if (!url) {

        alert("Please enter a website URL");

        return;

    }

    loading.style.display = "block";

    results.innerHTML = "";

    analyzeBtn.disabled = true;

    analyzeBtn.innerText = "Analyzing...";

    try {

        const response = await fetch("http://localhost:5000/api/analyze", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                url

            })

        });

        const result = await response.json();

        loading.style.display = "none";

        analyzeBtn.disabled = false;

        analyzeBtn.innerText = "Analyze Website";

        if (!result.success) {

            results.innerHTML = `

            <div class="card">

                <h2 style="color:red">

                    ${result.message}

                </h2>

            </div>

            `;

            return;

        }

        showResults(result.data);

    }

    catch (error) {

        loading.style.display = "none";

        analyzeBtn.disabled = false;

        analyzeBtn.innerText = "Analyze Website";

        results.innerHTML = `

        <div class="card">

            <h2 style="color:red">

                ${error.message}

            </h2>

        </div>

        `;

    }

}
function showResults(data) {
    const score = calculateSEOScore(data);
function calculateSEOScore(data){

let score=100;

// Title

if(data.seo.titleLength<30 || data.seo.titleLength>60){

score-=10;

}

// Meta Description

if(data.seo.descriptionLength<120 || data.seo.descriptionLength>160){

score-=10;

}

// Word Count

if(data.words<300){

score-=15;

}

// Headings

if(data.headings===0){

score-=10;

}

// Images

if(data.images===0){

score-=5;

}

// Links

if(data.links.totalLinks===0){

score-=5;

}

// Canonical

if(!data.seo.canonical){

score-=10;

}

// Language

if(!data.seo.language){

score-=5;

}

if(score<0){

score=0;

}

return score;

}
    const keywordCards = data.keywords.topKeywords.map(keyword => `
        <div class="card">
            <h3>🔑 ${keyword.word}</h3>
            <h2>${keyword.count}</h2>
            <small>Density: ${keyword.density}</small>
        </div>
    `).join("");

    results.innerHTML = `
<div class="score-wrapper">

<div class="score-card">

<h2>SEO Score</h2>

<div class="score-circle">

${score}

</div>

<div class="score-text">

${
score>=90
?"Excellent"

:score>=70
?"Good"

:score>=50
?"Average"

:"Poor"

}

</div>

</div>

</div>
    <h1 class="result-title">
        Website Analysis Report
    </h1>

    <h2 class="section-title">
        📊 Overview
    </h2>

    <div class="dashboard">

        <div class="card">
            <h3>📝 Words</h3>
            <h2>${data.words}</h2>
            <small>Total Words</small>
        </div>

        <div class="card">
            <h3>🔤 Characters</h3>
            <h2>${data.characters}</h2>
            <small>Total Characters</small>
        </div>

        <div class="card">
            <h3>📑 Paragraphs</h3>
            <h2>${data.paragraphs}</h2>
            <small>Paragraph Count</small>
        </div>

        <div class="card">
            <h3>📚 Headings</h3>
            <h2>${data.headings}</h2>
            <small>H1 - H6 Tags</small>
        </div>

        <div class="card">
            <h3>🖼 Images</h3>
            <h2>${data.images.totalImages}</h2>
            <small>Total Images</small>
        </div>

        <div class="card">
            <h3>🔗 Links</h3>
            <h2>${data.links.totalLinks}</h2>
            <small>Total Links</small>
        </div>

        <div class="card">
            <h3>📖 Reading Time</h3>
            <h2>${data.readingTime}</h2>
            <small>Estimated</small>
        </div>

        <div class="card">
            <h3>📄 HTML Size</h3>
            <h2>${data.htmlSize}</h2>
            <small>HTML Document</small>
        </div>

    </div>


    <h2 class="section-title">
        🌐 SEO Information
    </h2>

    <div class="dashboard">

        <div class="card">
            <h3>Title</h3>
            <h2 style="font-size:22px;">
                ${data.title}
            </h2>
        </div>

        <div class="card">
            <h3>Title Length</h3>
            <h2>${data.seo.titleLength}</h2>
        </div>

        <div class="card">
            <h3>Description Length</h3>
            <h2>${data.seo.descriptionLength}</h2>
        </div>

        <div class="card">
            <h3>Language</h3>
            <h2>${data.seo.language || "-"}</h2>
        </div>

        <div class="card">
            <h3>Viewport</h3>
            <h2 style="font-size:18px;">
                ${data.seo.viewport || "-"}
            </h2>
        </div>

        <div class="card">
            <h3>Canonical</h3>
            <h2>
                ${data.seo.canonical ? "✅ Yes" : "❌ No"}
            </h2>
        </div>

        <div class="card">
            <h3>Robots</h3>
            <h2 style="font-size:20px;">
                ${data.seo.robots || "-"}
            </h2>
        </div>

    </div>


    <h2 class="section-title">
        🔑 Top Keywords
    </h2>

    <div class="dashboard">

        ${keywordCards}

    </div>


    <h2 class="section-title">
        🔗 Link Analysis
    </h2>

    <div class="dashboard">

        <div class="card">
            <h3>Total Links</h3>
            <h2>${data.links.totalLinks}</h2>
        </div>

        <div class="card">
            <h3>Internal Links</h3>
            <h2>${data.links.internalLinksCount}</h2>
        </div>

        <div class="card">
            <h3>External Links</h3>
            <h2>${data.links.externalLinksCount}</h2>
        </div>

    </div>

    `;

}