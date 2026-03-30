import type { Transacao } from "../types/Transacao";
import { Formatters } from "../utils/formatters";

export class DashboardView {
    private elementos: {
        saldo: HTMLElement | null;
        entradas: HTMLElement | null;
        saidas: HTMLElement | null;
        totalTransacoes: HTMLElement | null;
        limiteDisponivel: HTMLElement | null;
        proximaFatura: HTMLElement | null;
        listaTransacoes: HTMLElement | null;
        cartaoNumero: HTMLElement | null;
        cartaoTitular: HTMLElement | null;
        cartaoValidade: HTMLElement | null;
        historicoBadge: HTMLElement | null;
    };

    constructor() {
        this.elementos = {
            saldo: document.querySelector('.saldo-valor'),
            entradas: document.querySelector('.detalhe-valor.entrada'),
            saidas: document.querySelector('.detalhe-valor.saida'),
            totalTransacoes: document.querySelector('.detalhe-item:last-child .detalhe-valor'),
            limiteDisponivel: document.querySelector('.card-info:first-child .card-info-valor'),
            proximaFatura: document.querySelector('.card-info:last-child .card-info-valor'),
            listaTransacoes: document.querySelector('.lista-transacoes'),
            cartaoNumero: document.querySelector('.cartao-numero'),
            cartaoTitular: document.querySelector('.cartao-campo-valor'),
            cartaoValidade: document.querySelector('.cartao-rodape div:last-child .cartao-campo-valor'),
            historicoBadge: document.querySelector('.historico-badge')
        };
    }

    atualizarSaldo(saldo: number): void {
        if (this.elementos.saldo) {
            this.elementos.saldo.textContent = Formatters.moeda(saldo);
        }
    }

    atualizarResumo(entradas: number, saidas: number): void {
        if (this.elementos.entradas) {
            this.elementos.entradas.textContent = Formatters.moeda(entradas);
        }
        if (this.elementos.saidas) {
            this.elementos.saidas.textContent = Formatters.moeda(saidas);
        }
    }

    atualizarTotalTransacoes(total: number): void {
        if (this.elementos.totalTransacoes) {
            this.elementos.totalTransacoes.textContent = total.toString();
        }
        if (this.elementos.historicoBadge) {
            this.elementos.historicoBadge.textContent = `${total} transações`;
        }
    }

    atualizarCartao(titular: string, numero: string, validade: string): void {
        if (this.elementos.cartaoTitular) {
            this.elementos.cartaoTitular.textContent = titular.toUpperCase();
        }
        if (this.elementos.cartaoNumero) {
            this.elementos.cartaoNumero.textContent = Formatters.cartao(numero);
        }
        if (this.elementos.cartaoValidade) {
            this.elementos.cartaoValidade.textContent = validade;
        }
    }

    atualizarTransacoes(transacoes: Transacao[]): void {
        if (!this.elementos.listaTransacoes) return;

        this.elementos.listaTransacoes.innerHTML = '';

        transacoes.slice(0, 8).forEach(transacao => {
            const item = this.criarItemTransacao(transacao);
            this.elementos.listaTransacoes?.appendChild(item);
        });
    }

    private criarItemTransacao(transacao: Transacao): HTMLLIElement {
        const li = document.createElement('li');
        li.className = 'transacao';

        const valorFormatado = Formatters.moeda(transacao.valor);
        const sinal = transacao.sinal === 'positive' ? '+' : '-';
        const classeValor = transacao.sinal === 'positive' ? 'positivo' : 'negativo';

        li.innerHTML = `
            <div class="transacao-icone ${this.getTipoClasse(transacao.tipo)}">${transacao.icone}</div>
            <div class="transacao-info">
                <span class="transacao-desc">${transacao.descricao}</span>
                <span class="transacao-data">${transacao.data}</span>
            </div>
            <span class="transacao-valor ${classeValor}">
                ${sinal} ${valorFormatado}
            </span>
        `;

        return li;
    }

    atualizarLimites(limite: number, fatura: number): void {
        if (this.elementos.limiteDisponivel) {
            this.elementos.limiteDisponivel.textContent = Formatters.moeda(limite);
        }
        if (this.elementos.proximaFatura) {
            this.elementos.proximaFatura.textContent = `15/abr · ${Formatters.moeda(fatura)}`;
        }
    }

    private getTipoClasse(tipo: string): string {
        switch (tipo) {
            case 'deposit': return 'deposito';
            case 'retirar': return 'saque';
            case 'transfer': return 'transferencia';
            default: return '';
        }
    }
}