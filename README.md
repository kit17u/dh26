# HydroGarden

## 1. Introduction
HydroGarden - YPVG (Your Personal Virtual Garden) is a digital platform that helps visualize your healthy habit of drinking water. As you stay hydrated, it rewards you with a flourishing garden or a vibrant forest, blossoming with each drop you drink.

## 2. How does it work?
 HydroGarden features a IoT coaster that tracks your water consumption and uses this data to water the plants in your virtual garden. The system includes a weight sensor connected to an Arduino Nano, which communicates with a web app powered by Django.

## 3. Set up instructions
#### Create virtual environment:
```
python -m venv .venv
```

#### Activate:
```
source .venv/bin/activate
```

#### Install dependencies:
```
pip install -r requirements.txt
```

#### Migrate:
```
python manage.py migrate
```

#### Create superuser:
```
python manage.py createsuperuser
```

#### Run server:
```
python manage.py runserver
```

Opis iz ankete: An IoT coaster powered by Arduino sensors enables the gamification of water consumption and nurtures plants in your personal virtual garden.
