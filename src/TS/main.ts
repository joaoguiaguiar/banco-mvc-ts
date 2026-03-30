import ContaBancaria from "./model/ContaBancaria";
import { ContaController } from "./controllers/ContaController";
import { DashboardView } from "./views/DashboardView";
import type { Transacao } from "./types/Transacao";

// Dados iniciais das transações
const transacoesIniciais: Transacao[] = [
    {
        id: 1,
        tipo: "deposit",
        descricao: "Depósito - Salário (Empresa X)",
        valor: 4200,
        data: "18 mar 2025 • 09:32",
        icone: "↑",
        sinal: "positive"
    },
    {
        id: 2,
        tipo: "retirar",
        descricao: "Saque - Terminal 24h",
        valor: 300,
        data: "17 mar 2025 • 14:17",
        icone: "↓",
        sinal: "negative"
    },
    {
        id: 3,
        tipo: "transfer",
        descricao: "Transferência para Lucas M.",
        valor: 850,
        data: "15 mar 2025 • 20:45",
        icone: "⇄",
        sinal: "negative"
    },
    {
        id: 4,
        tipo: "deposit",
        descricao: "PIX recebido - Freela",
        valor: 950,
        data: "12 mar 2025 • 11:03",
        icone: "↑",
        sinal: "positive"
    },
    {
        id: 5,
        tipo: "retirar",
        descricao: "Pagamento - Aluguel",
        valor: 2100,
        data: "10 mar 2025 • 08:22",
        icone: "↓",
        sinal: "negative"
    },
    {
        id: 6,
        tipo: "transfer",
        descricao: "Transferência recebida - Ana C.",
        valor: 320,
        data: "05 mar 2025 • 16:50",
        icone: "⇄",
        sinal: "positive"
    },
    {
        id: 7,
        tipo: "deposit",
        descricao: "Cashback | Compras",
        valor: 42.80,
        data: "01 mar 2025 • 23:10",
        icone: "↑",
        sinal: "positive"
    },
    {
        id: 8,
        tipo: "retirar",
        descricao: "Tarifa bancária",
        valor: 14.90,
        data: "28 fev 2025 • 00:01",
        icone: "↓",
        sinal: "negative"
    }
];

// Inicializa a conta
const conta = new ContaBancaria(
    1,
    "JULIA DIAS",
    "5248120987453102",
    "08/28",
    200,
    8500.00,
    1247.30,
    transacoesIniciais
);

// Inicializa Controller e View
const controller = new ContaController(conta);
const view = new DashboardView();

// Função para atualizar toda a interface
function atualizarInterface() {
    view.atualizarSaldo(controller.getSaldo());
    view.atualizarResumo(controller.getEntradasTotal(), controller.getSaidasTotal());
    view.atualizarTotalTransacoes(controller.getTotalTransacoes());
    view.atualizarCartao(
        controller.getTitular(),
        controller.getNumeroCartao(),
        controller.getValidadeCartao()
    );
    view.atualizarTransacoes(controller.getTransacoes());
    view.atualizarLimites(controller.getLimiteDisponivel(), controller.getProximaFatura());
}

// Escuta eventos de atualização
window.addEventListener('contaAtualizada', (event: any) => {
    const { saldo, entradas, saidas, totalTransacoes, transacoes } = event.detail;
    view.atualizarSaldo(saldo);
    view.atualizarResumo(entradas, saidas);
    view.atualizarTotalTransacoes(totalTransacoes);
    view.atualizarTransacoes(transacoes);
    view.atualizarLimites(controller.getLimiteDisponivel(), controller.getProximaFatura());
});

// Inicializa a interface
atualizarInterface();

// SÓ COPIA ISSO NO FINAL DO SEU main.ts (substitui tudo do modal)

const modal = document.getElementById('modal') as HTMLElement;
const modalTitulo = document.getElementById('modalTitulo') as HTMLElement;
const modalValor = document.getElementById('modalValor') as HTMLInputElement;
const campoExtra = document.getElementById('campoExtra') as HTMLElement;
const labelExtra = document.getElementById('labelExtra') as HTMLElement;
const modalExtra = document.getElementById('modalExtra') as HTMLInputElement;

let acaoAtual = 'deposito';

function abrirModal(tipo: string) {
    acaoAtual = tipo;
    
    if (tipo === 'deposito') {
        modalTitulo.textContent = 'Depósito';
        labelExtra.textContent = 'Descrição';
        campoExtra.style.display = 'block';
        modalExtra.placeholder = 'Ex: Salário';
    } else if (tipo === 'saque') {
        modalTitulo.textContent = 'Saque';
        labelExtra.textContent = 'Descrição';
        campoExtra.style.display = 'block';
        modalExtra.placeholder = 'Ex: Saque';
    } else {
        modalTitulo.textContent = 'Transferência';
        labelExtra.textContent = 'Destinatário';
        campoExtra.style.display = 'block';
        modalExtra.placeholder = 'Nome';
    }
    
    modalValor.value = '';
    modalExtra.value = '';
    modal.classList.add('active');
}

function fecharModal() {
    modal.classList.remove('active');
}

function confirmarModal() {
    const valor = parseFloat(modalValor.value);
    
    if (isNaN(valor) || valor <= 0) {
        alert('Digite um valor válido!');
        return;
    }
    
    if (acaoAtual === 'deposito') {
        const descricao = modalExtra.value.trim() || 'Depósito';
        controller.realizarDeposito(valor, descricao);
    } else if (acaoAtual === 'saque') {
        const descricao = modalExtra.value.trim() || 'Saque';
        controller.realizarSaque(valor, descricao);
    } else {
        const destinatario = modalExtra.value.trim();
        if (!destinatario) {
            alert('Digite o destinatário!');
            return;
        }
        controller.realizarTransferencia(valor, destinatario);
    }
    
    fecharModal();
}

// Configurar botões
document.querySelector('.btn-operacao.deposito')?.addEventListener('click', () => abrirModal('deposito'));
document.querySelector('.btn-operacao.saque')?.addEventListener('click', () => abrirModal('saque'));
document.querySelector('.btn-operacao.transferencia')?.addEventListener('click', () => abrirModal('transferencia'));

document.getElementById('cancelarModal')?.addEventListener('click', fecharModal);
document.getElementById('confirmarModal')?.addEventListener('click', confirmarModal);
document.querySelector('.modal-fechar')?.addEventListener('click', fecharModal);
modal?.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
});

console.log('✅ Modal configurado!');