export interface Transacao {
    id: number;
    tipo: "deposit" | "retirar" | "transfer";
    descricao: string;
    valor: number;
    data: string;
    icone: "↑" | "↓" | "⇄";
    sinal: "positive" | "negative";
}