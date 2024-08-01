export class Trip {
  constructor(ownerIds, memberIds, title, description, destination, requirements, startDate, endDate, status) {
    this.ownerIds = ownerIds;
    this.memberIds = memberIds;
    this.title = title;
    this.description = description;
    this.destination = destination;
    this.requirements = requirements; // {id: {category: '...', description: '...'}}
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
  }

  updateDetails(details) {
    Object.assign(this, details);
  }

  addMember(member) {
    if (!this.memberIds.includes(member)) {
      this.memberIds.push(member);
      console.log(`${member} added to the trip.`);
    } else {
      console.log(`${member} is already a member of this trip.`);
    }
  }

  removeMember(member) {
    const index = this.memberIds.indexOf(member);
    if (index > -1) {
      this.memberIds.splice(index, 1);
      console.log(`${member} removed from the trip.`);
    } else {
      console.log(`${member} is not a member of this trip.`);
    }
  }

  isOwner(user) {
    return this.ownerIds.includes(user);
  }
}
