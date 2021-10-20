import os
import time
import yaml
from typing import List

from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler, DirModifiedEvent

from jinja2 import Environment, FileSystemLoader, select_autoescape


class Template():
    def __init__(self, name, env):
        self.name = name
        self.env = env

    def __str__(self) -> str:
        return f'<Template {self.name}>'

    def __repr__(self) -> str:
        return self.__str__()

    def render(self, jinja_env: Environment, dest_dir: str):
        tmpl = jinja_env.get_template(self.name)
        tmpl_data = self.env or {}
        rt = tmpl.render(**tmpl_data)
        with open(os.path.join(dest_dir, self.name), 'w') as f:
            f.write(rt)


def load_config(config_filename: str = 'templating.yml') -> dict:
    with open(config_filename) as f:
        data = yaml.load(f, Loader=yaml.Loader)

    templates = []
    for key, value in data['templates'].items():
        tmpl = Template(key, value)
        templates.append(tmpl)

    data.update({'templates': templates})
    return data

config = load_config()

jinja_env = Environment(
    loader=FileSystemLoader(config['src']),
    autoescape=select_autoescape()
)

jinja_env.trim_blocks = True
jinja_env.lstrip_blocks = True


def on_modified(event):

    if not isinstance(event, DirModifiedEvent):
        return

    print('Rendering templates')
    config = load_config()
    for t in config['templates']:
        t.render(jinja_env, config['dest'])


if __name__ == '__main__':
    my_event_handler = PatternMatchingEventHandler(['*'])
    my_event_handler.on_modified = on_modified

    path = config['src']
    my_observer = Observer()
    my_observer.schedule(my_event_handler, path, True)

    my_observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        my_observer.stop()
        my_observer.join()