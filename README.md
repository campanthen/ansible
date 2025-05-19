# Ansible Project for Web Application Deployment

This Ansible project deploys a web application infrastructure on Debian servers, consisting of:
- Two Nginx web servers (`web01`, `web02`)
- One Python backend server (`backend01`)
- One HAProxy load balancer (`lb01`)
- One MariaDB database (`db01`)

## Directory Structure
- `inventory/`: Host and group variables for production environment.
- `group_vars/`: Global variables and vault-encrypted secrets.
- `playbooks/`: Playbook to deploy the infrastructure.
- `roles/`: Roles for webserver, database, backend, and loadbalancer.
- `requirements.yml`: Ansible collection dependencies.

## Usage
1. Update `inventory/production` with your server details.
2. Configure variables in `group_vars/` and `inventory/group_vars/`.
3. Encrypt sensitive data in `group_vars/databases/secrets.yml` using Ansible Vault.
4. Install dependencies: `ansible-galaxy collection install -r requirements.yml`.
5. Run the playbook: `ansible-playbook -i inventory/production playbooks/deploy_webapp.yml --vault-password-file vault_pass.txt`.

## Requirements
- Ansible >= 2.9
- Debian-based servers
- SSH access to all hosts
- Vault password file (`vault_pass.txt`)
