const moment = require('moment')
const { Appointment } = require('../models')
// dentro do OP traz os operadores de consulta where do sequelize
const { Op } = require('sequelize')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInd(parse.req.date))

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00'
    ]
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      // 2018-11-20 08:00:00 modelo da data acima

      return {
        time,
        value: value.format(),
        // verifica se os horários passsou ou não
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
        // && - verifica o agendamento
      }
    })

    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
