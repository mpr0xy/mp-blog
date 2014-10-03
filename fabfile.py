from fabric.api import sudo, task, env, hosts
from fabric.context_managers import cd

env.use_ssh_config = True


@task(default=True)
@hosts('my-blog')
def run_deploy(branch='master'):
  deploy(branch)


def deploy(branch):
  with cd('/data/apps/my-blog'):
    sudo('git fetch')
    sudo('git checkout ' + branch)
    sudo('git reset --hard origin/' + branch)
    sudo('cp -f config-example.json config.json')
    sudo('supervisorctl update')
    sudo('supervisorctl restart mpr0xy-blog')




