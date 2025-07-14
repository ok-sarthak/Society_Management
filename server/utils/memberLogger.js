import logger from './logger.js';

class MemberLogger {
  static logMemberAction(action, memberId, performedBy, details = {}) {
    const logData = {
      action,
      memberId,
      performedBy,
      timestamp: new Date(),
      details
    };
    
    logger.info(`Member Action: ${action}`, logData);
  }

  static logMemberCreation(member, createdBy) {
    this.logMemberAction('MEMBER_CREATED', member._id, createdBy, {
      name: member.name,
      buildingNumber: member.buildingNumber,
      blockNumber: member.blockNumber,
      floorNumber: member.floorNumber
    });
  }

  static logMemberUpdate(memberId, updates, updatedBy) {
    this.logMemberAction('MEMBER_UPDATED', memberId, updatedBy, {
      updates
    });
  }

  static logMemberDeletion(memberId, deletedBy) {
    this.logMemberAction('MEMBER_DELETED', memberId, deletedBy);
  }

  static logMaintenancePayment(memberId, amount, paidBy) {
    this.logMemberAction('MAINTENANCE_PAID', memberId, paidBy, {
      amount,
      paymentDate: new Date()
    });
  }

  static logMaintenanceUpdate(memberId, maintenanceData, updatedBy) {
    this.logMemberAction('MAINTENANCE_UPDATED', memberId, updatedBy, {
      maintenanceData
    });
  }
}

export default MemberLogger;
