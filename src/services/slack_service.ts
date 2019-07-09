import rp from 'request-promise';

export class SlackService {

    private static readonly TOKEN_UNQ_TALLER_DE_SERVICIOS = 'xoxs-588731662279-579413067777-588101111940-52aef457e0fea42a14cea789d485232938c5d70843f87b87683905b40a330286';
    private static readonly CHANNEL_MONITOR_GRUPO4 = 'GLA6ES6HM';

    public sendMessage(channel: string, message: string, token?: string) {
        if(!token) {
            token = SlackService.TOKEN_UNQ_TALLER_DE_SERVICIOS;
        }
        let options = {
            uri: `https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${message}`,
            method: 'POST',
            json: true
        }
        return rp(options)
            .then(data => {
                if(!data.ok) {
                    return Promise.reject(new Error(data.error));
                }
                return data.ok;
            })
            .catch(err => {
                return Promise.reject(new Error(err.error));
            })
    }

    public notifyServiceIsWorking(nameServer: string) {
        let message = `${this.getDateAndHour()} El servicio '${nameServer}' ha vuelto a la normalidad`;
        this.sendMessage(SlackService.CHANNEL_MONITOR_GRUPO4, message);
    }

    public notifyServiceIsNotWorking(nameServer: string) {
        let message = `${this.getDateAndHour()} El servicio '${nameServer}' ha dejado de funcionar`;
        this.sendMessage(SlackService.CHANNEL_MONITOR_GRUPO4, message);
    }

    private getDateAndHour(): string {
        let date = new Date();
        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let hora = date.getHours();
        let minutos = date.getMinutes();
        return `[${dia}/${mes} - ${hora}:${minutos}]`;
    }
}