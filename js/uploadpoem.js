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
    document.getElementById("uploadbtn").disabled = true;

    const title = document.getElementById("poemtitle").value;
    const signature = document.getElementById("poemsignature").value;
    const content = document.getElementById("poemcontent").value;
    const date = document.getElementById("poemdate").value;
    const parsedContent = parsePoem(content);
    const signatureLength = document.getElementById("poemsignaturelength").value;

    const result = await uploadPoem(title, signature, date, parsedContent, signatureLength);
    if("error" in result) {
        alert(`Failed to upload poem: ${result.error}`);
        document.getElementById("uploadbtn").disabled = false;
        return;
    }

    window.location.href = "index.html";
}