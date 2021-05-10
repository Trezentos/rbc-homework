const searchBtn = document.querySelector('#searchBtn')
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

    const PcDatas = await response.json();

    if (PcDatas) {
        contentBox.style.display = 'none';
        computerContentBox.style.display = 'block'

        PcDatas.forEach((Pcdata, index)=>{
            availableComputers.innerHTML+=
            `
                <div class="pc-card">
                    <div class="header">
                                    <h3>Computador ${index + 1}</h3>
                                    
                    </div>
                    <div class="pc-content">
                        <p>Processador: ${Pcdata.processador}</p>
                        <p>Memória Ram: ${Pcdata.memoriaRam}</p>
                        <p>Disco: ${Pcdata.disco}</p>
                        <p>Placa de Video: ${Pcdata.placaDeVideo}</p>
                        <p>Compatibilidade: ${Pcdata.compatibilidade}</p>
                    </div>
                </div>
            `
        })
    }
})