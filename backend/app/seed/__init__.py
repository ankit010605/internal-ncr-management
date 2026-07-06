import click

from app.seed.seed_plant_master import seed_plant_master


def register_seed_commands(app):

    @app.cli.command("seed-plant-master")
    def seed_plant_master_command():
        """
        Seed Plant Master Data
        """
        seed_plant_master()
        click.echo("✅ Plant Master seeded successfully.")