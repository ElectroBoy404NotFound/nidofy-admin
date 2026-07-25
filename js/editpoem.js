const id = localStorage.getItem("editPoemId");
if(!id) {
    alert("No poem ID provided for editing.");
    window.location.href = "poemslist.html";
}

function parsePoem(text) {
    return text
        .trim()
        .split(/\n\s*\n/)
        .filter(s => s.trim().length > 0)
        .map(stanza => {
            return stanza
                .split("\n")
                .map(line => line.trim())
                .filter(line => line.length > 0);
        });
}

async function onUploadPoemSubmit(e) {
    e.preventDefault();
    document.getElementById("editbtn").disabled = true;

    const title = document.getElementById("poemtitle").value;
    const signature = document.getElementById("poemsignature").value;
    const content = document.getElementById("poemcontent").value;
    const date = document.getElementById("poemdate").value;
    const parsedContent = parsePoem(content);
    const signatureLength = document.getElementById("poemsignaturelength").value;

    const result = await editPoem(id, title, signature, date, parsedContent, signatureLength);
    if("error" in result) {
        alert(`Failed to modify poem: ${result.error}`);
        document.getElementById("editbtn").disabled = false;
        return;
    }

    window.location.href = "poemslist.html";
}

(async () => {
    document.getElementById("poemid").value = id;

    const poemData = await getPoem(id);
    if("error" in poemData) {
        alert(`Failed to load poem data: ${poemData.error}`);
        window.location.href = "poemslist.html";
        return;
    }

    document.getElementById("poemtitle").value = poemData.title;
    document.getElementById("poemsignature").value = poemData.signature;
    document.getElementById("poemdate").value = poemData.date;
    document.getElementById("poemcontent").value = poemData.poem.map(stanza => stanza.join("\n")).join("\n\n");
    document.getElementById("poemsignaturelength").value = poemData.signatureLength;
})();