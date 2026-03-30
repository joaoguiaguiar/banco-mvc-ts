export class Formatters {
    static moeda(valor: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }
    
    static cartao(numero: string): string {
        return numero.replace(/(\d{4})/g, '$1 ').trim();
    }
    
    static data(data: Date): string {
        const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();
        const horas = data.getHours().toString().padStart(2, "0");
        const minutos = data.getMinutes().toString().padStart(2, "0");
        
        return `${dia} ${mes} ${ano} • ${horas}:${minutos}`;
    }
}