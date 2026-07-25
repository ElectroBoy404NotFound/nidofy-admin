
async function editpoem(id) {
    localStorage.setItem("editPoemId", id);
    window.location.href = "editpoem.html";
}

async function deletepoem(id, name) {
    if(!confirm(`Are you sure you want to delete this poem (${name})? This action cannot be undone.`)) {
        return;
    }

    const result = await deletePoem(id);
    if("error" in result) {
        alert(`Failed to delete poem: ${result.error}`);
        return;
    }
    window.location.reload();
}

(async () => {
    const poemsData = await getListOfPoems();
    if("error" in poemsData) {
        alert(`Failed to load poems data: ${poemsData.error}`);
        return;
    }

    const table = new simpleDatatables.DataTable("#poemstable", {
        data: {
            headings: ["ID", "Title", "Signature", "Date", "Actions"],
            data: poemsData.map(poem => [
                poem.id,
                poem.title,
                poem.signature,
                poem.date,
                `<button onclick="editpoem(${poem.id})" class="btn btn-sm btn-sm-circle btn-success m-1"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deletepoem(${poem.id}, '${poem.title}')" class="btn btn-sm btn-sm-circle btn-danger m-1"><i class="fa-solid fa-trash-can"></i></button>`
            ])
        }
    });
})();