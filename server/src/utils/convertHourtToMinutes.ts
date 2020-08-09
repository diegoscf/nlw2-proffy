export default function hourToMinutes(time: string) {
    // dá o split, pega hora e minuto e converte um número e 
    // depois desestrutura o array e cria as variáveis
    const [hour, minutes] = time.split(':').map(Number);
    return (hour * 60) + minutes;
}