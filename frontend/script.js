const searchBtn = document.querySelector('#searchBtn')
const body = document.querySelector('body');
const datas = document.querySelector('#formValues');
const contentBox = document.querySelector('.content');
const computerContentBox = document.querySelector('.computers-content');
const availableComputers = document.querySelector('.available-computers')


searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const [ processador, memoriaRam, disco, placaDeVideo ] 
    = [ datas[0].value, datas[1].value, datas[2].value, datas[3].value ]

    const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            body: JSON.stringify({
                processador,
                memoriaRam,
                disco,
                placaDeVideo,
            }),
            headers: { 
                "Content-Type": "application/json" ,
            },
    });

    const pcDatas = await response.json();

    console.log(pcDatas);

    if (pcDatas) {
        contentBox.style.display = 'none';
        computerContentBox.style.display = 'block'

        

        pcDatas.forEach((pcData, index)=>{
            availableComputers.innerHTML+=
            `
            
                <div class="pc-card">
                    <div class="header">
                        <h3>Computador ${pcData.nome}</h3>
                                    
                    </div>
                    <div class="pc-content">
                        <p>Processador: ${pcData.processador}</p>
                        <p>Memória Ram: ${pcData.memoriaRam}</p>
                        <p>Disco: ${pcData.disco}</p>
                        <p>Placa de Video: ${pcData.placaDeVideo}</p>
                        <p style="color:${pcData.compatibilidade > 0.7 ? "green": "red"}" >
                        Compatibilidade: ${pcData.compatibilidade*100}%</p>
                    </div>
                </div>
            `
        })

        
        body.innerHTML += `
        <div class="computador-escolhido">
                <h3>Partes do pc escolhido</h3>
                <p>Processador: ${processador}</p>
                <p>memoria ram: ${memoriaRam}</p>
                <p>disco: ${disco}</p>
                <p>placa de video: ${placaDeVideo}</p>
                <a href="/" >Voltar</a>
        </div>
        `
    }
})