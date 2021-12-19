export default function getTeamplate() {
  return `
  <button class="btn ${this.type ? this.type + '-btn' : ''}">
    ${this.content}
  </button>
  `;
}
