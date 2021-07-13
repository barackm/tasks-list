class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
localStorage.setItem('projectList', JSON.stringify([
  {
    name: 'CapstoneProject',
  },
  {
    name: 'Todo Project',
  },
  {
    name: 'RestaurauntProject',
  },
]));

describe('on page load', () => {
  it(' it should create default projects', () => {
    const storage = JSON.parse(localStorage.getItem('projectList'));
    expect(storage[0].name).toBe('CapstoneProject');
  });
  it('expect projectlist length to be 3', () => {
    const storage = JSON.parse(localStorage.getItem('projectList'));
    expect(storage.length).toEqual(3);
  });
});