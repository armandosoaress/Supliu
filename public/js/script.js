async function seachdiscografia() {
    try {
        const data = await fetch(`http://127.0.0.1:8000/Discografia`);
        return await data.json();
    } catch (err) {
        return console.log(err);
    }
}

async function insertdiscografia(id) {
    Swal.fire({
        imageUrl: './image/gif/a56fc90a5ed23e3047aa9cc902750b54.gif',
        showConfirmButton: false,
        background: '#141414',
    })
    const discografia = await seachdiscografia();
    localStorage.setItem('discografia', JSON.stringify(discografia));
    Swal.close();

    const tabela = `
${discografia.map(album => `
<table style="background-color: #ffffffa3;" class="centered">
    <caption style="background-color: #ffffffa3;text-align: left;padding-left: 65px;font-weight: 800;">&Aacute;lbum ${album.nome} - ${album.id}</caption>
    <thead>
    <tr>
        <th style="text-align: left;font-weight: 400; padding: 15px 65px;">N&ordm;</th>
        <th style="text-align: left;font-weight: 400;">Faixa</th>
        <th style="text-align: left;font-weight: 400; padding: 15px 65px;">Dura&ccedil;&atilde;o</th>
    </tr>
    </thead>
    <tbody>
    ${album.faixas.map(faixa => `
        <tr>
        <td>${faixa.id}</td>
        <td style="text-align: left; word-break: break-all; width: 100%;">${faixa.nome}</td>
        <td>${faixa.duracao}</td>
        </tr>
    `).join('')}
    </tbody>
</table>
`).join('')}
`;
    document.getElementById('tabela').innerHTML = tabela;
}
insertdiscografia();


var inputElement = document.getElementById("busca");
inputElement.addEventListener("input", function () {
    if (inputElement.value == '') {
        insertdiscografia();
    }
});


function seach(text) {
    const valor = text;
    const discografia = JSON.parse(localStorage.getItem('discografia'));
    const resultado = discografia.filter(album => {
        return album.nome.toLowerCase().includes(valor);
    });
    if (resultado.length == 0) {
        return seachfaixa(text);
    }
    document.getElementById('tabela').innerHTML = `
    ${resultado.map(album => `
    <table style="background-color: #ffffffa3;" class="centered">
        <caption style="background-color: #ffffffa3;text-align: left;padding-left: 65px;font-weight: 800;">&Aacute;lbum ${album.nome} - ${album.id}</caption>
        <thead>
        <tr>
            <th style="text-align: left;font-weight: 400; padding: 15px 65px;">N&ordm;</th>
            <th style="text-align: left;font-weight: 400;">Faixa</th>
            <th style="text-align: left;font-weight: 400; padding: 15px 65px;">Dura&ccedil;&atilde;o</th>
        </tr>
        </thead>
        <tbody>
        ${album.faixas.map(faixa => `
            <tr>
            <td>${faixa.id}</td>
            <td style="text-align: left; word-break: break-all; width: 100%;">${faixa.nome}</td>
            <td>${faixa.duracao}</td>
            </tr>
        `).join('')}
        </tbody>
    </table>
    `).join('')}
    `;



}

function seachfaixa(text) {
    const valor = text;
    const discografia = JSON.parse(localStorage.getItem('discografia'));
    const resultado = discografia.filter(album => {
        const faixasEncontradas = album.faixas.filter(faixa => faixa.nome.toLowerCase().includes(valor));
        return faixasEncontradas.length > 0;
    });
    if (resultado.length == 0) {
        return document.getElementById('tabela').innerHTML = `
        <div style="background-color: #ffffffa3; padding: 15px 65px; text-align: center; font-weight: 800; font-size: 20px;">
            Nenhum resultado encontrado!
        </div>
        `;
    }
    document.getElementById('tabela').innerHTML = `
        ${resultado.map(album => {
        const faixasFiltradas = album.faixas.filter(faixa => faixa.nome.toLowerCase().includes(valor));
        return `
        <table style="background-color: #ffffffa3;" class="centered">
        <caption style="background-color: #ffffffa3;text-align: left;padding-left: 65px;font-weight: 800;">&Aacute;lbum ${album.nome} - ${album.id}</caption>
        <thead>
        <tr>
            <th style="text-align: left;font-weight: 400; padding: 15px 65px;">N&ordm;</th>
            <th style="text-align: left;font-weight: 400;">Faixa</th>
            <th style="text-align: left;font-weight: 400; padding: 15px 65px;">Dura&ccedil;&atilde;o</th>
        </tr>
        </thead>
        <tbody>
        ${album.faixas.map(faixa => `
            <tr>
            <td>${faixa.id}</td>
            <td style="text-align: left; word-break: break-all; width: 100%;">${faixa.nome}</td>
            <td>${faixa.duracao}</td>
            </tr>
        `).join('')}
        </tbody>
    </table>
            `;
    }).join('')}`;
}



function cad() {

    Swal.fire({
        title: 'Cadastrar',
        text: " O QUE VOCÊ DESEJA CADASTRAR?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000000ab',
        confirmButtonText: 'Cadastrar Álbum',
        cancelButtonText: 'Cadastrar Faixa'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Cadastrar Álbum',
                html: `<input id="album" class="swal2" placeholder="Nome">`,
                confirmButtonText: 'Cadastrar',
                focusConfirm: false,
                preConfirm: () => {
                    const nome = Swal.getPopup().querySelector('#album').value
                    if (!nome) {
                        Swal.showValidationMessage(`Preencha o nome do álbum!`)
                    }
                }
            }).then((result) => {
                if (result.isConfirmed) {

                    var nome = document.getElementById('album').value;
                    var myHeaders = new Headers();
                    myHeaders.append("Accept", "application/json");
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "nome": nome,
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("http://127.0.0.1:8000/createalbum", requestOptions)
                        .then(response => response.json())
                        .then(result => cadverifica(result, "Álbum"))
                        .catch(error => cadverifica(error, "Álbum"));
                }
            })


        } else {


            var myHeaders = new Headers();
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://127.0.0.1:8000/albums", requestOptions)
                .then(response => response.json())
                .then(result => {
                    var Options = ''; // Inicializa a variável Options
                    result.forEach(element => {
                        Options += `<option value="${element.id}">${element.nome}</option>`; // Adiciona um novo option
                    });
                    const selectHTML = `
                  <select id="albumselect" class="swal2">
                    ${Options}
                  </select>
                `;
                    Swal.fire({
                        title: 'Cadastrar faixa',
                        html:
                            '<input id="faixa" class="swal2" placeholder="Nome">' +
                            '<input id="duracao" class="swal2" placeholder="Duração">' +
                            selectHTML,
                        confirmButtonText: 'Cadastrar',
                        focusConfirm: false,
                        preConfirm: () => {
                            const nome = Swal.getPopup().querySelector('#faixa').value;
                            const album = Swal.getPopup().querySelector('#albumselect').value;
                            const duracao = Swal.getPopup().querySelector('#duracao').value;

                            if (!nome || !album || !duracao) {
                                Swal.showValidationMessage('Preencha todos os campos!');
                                return;
                            }

                            var myHeaders = new Headers();
                            myHeaders.append("Accept", "application/json");
                            myHeaders.append("Content-Type", "application/json");

                            var raw = JSON.stringify({
                                "nome": nome,
                                "id": album,
                                "duracao": duracao
                            });

                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };

                            fetch("http://127.0.0.1:8000/createfaixa", requestOptions)
                                .then(response => response.json())
                                .then(result => cadverifica(result, "Faixa"))
                                .catch(error => cadverifica(error, "Faixa"));
                        }
                    });
                })
                .catch(error => console.log('error', error));
        }
    })
}
function cadverifica(result, tipo) {
    if (result.message == "sucess") {
        insertdiscografia();
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            position: 'top-end',
            text: tipo + " " + result.cad['nome'] + ' cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
        })

        return;
    }

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Erro ao cadastrar álbum!',
    })

}