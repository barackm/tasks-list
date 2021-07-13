/**
 * @jest-environment jsdom
 */
import project, { NewProject } from '../src/helper';

describe('After saving a project', () => {
  project.addProject = (name) => {
    if (!name) throw Error;
    const project = new NewProject(name);
    const allProjects = JSON.parse(localStorage.getItem('projectList')) || [];
    allProjects.unshift(project);
    return localStorage.setItem('projectList', JSON.stringify(allProjects));
  };
  project.removeProject = (id) => {
    if (!id) throw Error;
    let allProjects = JSON.parse(localStorage.getItem('projectList')) || [];
    allProjects = allProjects.filter((p) => p.id !== id);

    return localStorage.setItem('projectList', JSON.stringify(allProjects));
  };

  it('Should create a project if name is passed', () => {
    project.addProject('project1');
    const projects = JSON.parse(localStorage.getItem('projectList')) || [];
    expect(projects[0].name).toBe('project1');
  });

  it('Should remove a project if project id is passed', () => {
    let projects = JSON.parse(localStorage.getItem('projectList')) || [];
    project.removeProject(projects[0].id);
    projects = JSON.parse(localStorage.getItem('projectList')) || [];
    expect(projects.length).toBe(0);
  });

  it('Should throw an error if trying to add a project without the name', () => {
    expect(() => project.addProject()).toThrow();
  });

  it('Should throw an error if trying to remove a project without the id', () => {
    expect(() => project.removeProject()).toThrow();
  });

  //   it('Should an instance of the new project class', () => {
  //     const project = new NewProject('project1');
  //     expect(project).toBeInstanceOf(NewProject);
  //   });
});
