# A command line tool for bootjs 
[MIT](LICENSE)

## Global installation

> cnpm i bootjs-cli -g

## Create a template project 

simply run bootjs-cli to get the message as below:
```
Usage: bootjs-cli [options] [command]

Commands:
  init [options] <project_name>  create a new project

Options:

  -h, --help     output usage information
  -V, --version  output the version number

Examples:
  bootjs-cli init kickstart # Create a project with full kickstart samples.
  bootjs-cli init --template=compact kickstart # Create a compact project with a small sample.
  bootjs-cli init --template=mini kickstart  # Create a minimal bootjs project.
  bootjs-cli init --dir=/proj/kickstart kickstart  # Create a project which specified a target folder.
```
