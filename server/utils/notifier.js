import nodemailer from 'nodemailer';
import logger from './logger.js';

class Notifier {
  constructor() {
    // Temporarily disable email functionality
    this.transporter = null;
  }

  async sendMaintenanceReminder(member, dueAmount) {
    try {
      logger.info(`Would send maintenance reminder to ${member.email} for amount ${dueAmount}`);
      console.log(`📧 Maintenance reminder would be sent to ${member.email} for ₹${dueAmount}`);
    } catch (error) {
      logger.error('Error sending maintenance reminder:', error);
    }
  }

  async sendMaintenanceReceipt(member, amount, paymentDate) {
    try {
      logger.info(`Would send payment receipt to ${member.email} for amount ${amount}`);
      console.log(`📧 Payment receipt would be sent to ${member.email} for ₹${amount}`);
    } catch (error) {
      logger.error('Error sending payment receipt:', error);
    }
  }

  async sendWelcomeMessage(member) {
    try {
      logger.info(`Would send welcome message to ${member.email}`);
      console.log(`📧 Welcome message would be sent to ${member.email}`);
    } catch (error) {
      logger.error('Error sending welcome message:', error);
    }
  }
}

export default new Notifier();
