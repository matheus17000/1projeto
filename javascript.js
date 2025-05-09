const carrinho = [];

const produtos = [
    { nome: 'Lanche 3 Hamburgueres +cheddar, batata frita e copo de refrigerante 500ml', preco: 35.00 },
    { nome: '4 Lanches +refrigerante 2L', preco: 50.00 },
    { nome: 'combo de 3 Lanches', preco: 40.00 },
    { nome: 'Lanche hamburguer+alface,cebola,tomate e maionese', preco: 25.00 },
    { nome: 'Lanche + batata', preco: 22.00 },
    { nome: 'Pizza calabresa', preco: 38.00 },
    { nome: 'Pizza Pepperoni', preco: 39.00 },
    { nome: 'Pizza 4 queijos', preco: 42.00 },
    { nome: 'Pizza Portuguesa', preco: 41.00 },
    { nome: 'Pizza moda da casa', preco: 44.00 },
    { nome: 'Coca Cola 2L', preco: 10.00 },
    { nome: 'Combo sukita uva e laranja', preco: 12.00 },
    { nome: 'Pepsi 2L', preco: 9.00 },
    { nome: 'Suco Prats 900ml', preco: 8.00 }
];

const botoes = document.querySelectorAll('button');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
const fecharCarrinhoBtn = document.getElementById('fechar-carrinho');
const carrinhoLateral = document.getElementById('carrinho-lateral');
const finalizarCompraBtn = document.getElementById('finalizar-compra');

abrirCarrinhoBtn.addEventListener('click', () => {
    carrinhoLateral.classList.add('aberto');
});

fecharCarrinhoBtn.addEventListener('click', () => {
    carrinhoLateral.classList.remove('aberto');
});

botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        const nomeProduto = botao.previousElementSibling.textContent;
        const produto = produtos.find(p => p.nome === nomeProduto);

        if (produto) {
            const itemExistente = carrinho.find(item => item.nome === produto.nome);
            if (itemExistente) {
                itemExistente.quantidade += 1;
            } else {
                carrinho.push({ ...produto, quantidade: 1 });
            }
            atualizarCarrinho();
        }
    });
});

function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.style.marginLeft = '10px';
        btnRemover.onclick = () => {
            if (item.quantidade > 1) {
                item.quantidade -= 1;
            } else {
                carrinho.splice(index, 1);
            }
            atualizarCarrinho();
        };

        li.appendChild(btnRemover);
        listaCarrinho.appendChild(li);

        total += item.preco * item.quantidade;
    });

    totalCarrinho.textContent = total.toFixed(2);
}

// Função para gerar o link do WhatsApp
function gerarLinkWhatsApp() {
    const numeroWhatsApp = '55XXXXXXXXXXX'; // Insira o número de WhatsApp (formato internacional)
    let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n\n';
    
    carrinho.forEach(item => {
        mensagem += `${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$ ${totalCarrinho.textContent}\n\nAguardo a confirmação.`;

    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${"5544920029366"}&text=${encodeURIComponent(mensagem)}`;

    return urlWhatsApp;
}

// Finalizar Compra
finalizarCompraBtn.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    const linkWhatsApp = gerarLinkWhatsApp();
    window.open(linkWhatsApp, '_blank');
});
