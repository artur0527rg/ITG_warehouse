# 🏭 ITG Warehouse

**ITG Warehouse** is a warehouse management system developed to simplify inventory processes and optimize the supply chain. The project consists of several components:

## Project Structure

- **backend/**  
  Contains the server-side application, API endpoints, and business logic.

- **frontend/**  
  Contains basic static HTML and CSS used as a layout example for future React-based development.

- **frontend_react/**  
  A React-based application for a more interactive user interface.

## 🛠️ Technologies Used

- **Python** – for backend development and business logic.
- **React** – for building the modern frontend.
- **HTML/CSS** – for structuring and styling web pages.

## 🚀 Installation and Setup

Prerequisites
* Python 3.10+
* PostgreSQL 14+ (if using production DB)
* Redis (optional)

### Backend

1. Navigate to the `backend/` directory.
2. Create and activate a virtual environment:
    ```bash
    python -m venv .env
    source .env/bin/activate    # On Unix/MacOS
    ```
3. Install Dependencies:
    ```bash
    pip install -r requirements.txt
    pipx install psycopg2    # Package to work with your database
   ```
4. Configure Settings `core/settings.py`:
    ```python 
    # Critical settings (adjust for production!):  
    DEBUG = False  
    ALLOWED_HOSTS = ["your-domain.com", "localhost"]  
    CORS_ALLOWED_ORIGINS = ["https://your-frontend.com"]  # For API access  

    # Database (PostgreSQL example):  
    DATABASES = {  
        "default": {  
            "ENGINE": "django.db.backends.postgresql",  
            "NAME": "db_name",  
            "USER": "db_user",  
            "PASSWORD": "db_password",  
            "HOST": "localhost",  
            "PORT": "5432",  
        }  
    }
    # Channels
    CHANNEL_LAYERS = {
        "default": {
            "BACKEND": "channels.layers.InMemoryChannelLayer"
        },
    }
    ```
5. Database Setup:
    ```bash
    python manage.py makemigrations
    python manage.py migrate  
    python manage.py createsuperuser  # For admin access  
    ```
6. Run the Server:
    ```bash
    daphne -b 127.0.0.1 -p 8000 core.asgi:application
    # or
    nohup daphne -b 127.0.0.1 -p 8000 core.asgi:application > daphne.log 2>&1 &  
    ```

### Frontend
1. Navigate to Frontend Directory `frontend_react/` directory.
2. Install Dependencies:
    ```bash
    npm install
    ```
3. Configure Environment Variables
    Create `.env` file with your API endpoint:
    ```env
    API_URL=https://your-domain.com/
    WS_URL=wss://your-domain.com/
    ```
4. Production Build:
    ```bash
    npm run build
    ```
5. Move the build:
    ```bash
    mkdir /var/www/your-domain.com/html
    cp -r dist/* /var/www/your-domain.com/html/
    ```

### Web server
1. Install Nginx and Certbot:
    ```bash
    sudo apt update
    sudo apt install -y nginx certbot
    ```
2. Obtain SSL certificates:
    ```bash
    sudo certbot certonly --nginx
    ```
3. Configure Nginx `(/etc/nginx/sites-available/your-domain.com)`:
    ```conf
    server {
            listen 80;
            listen [::]:80;
            listen 443 default_server ssl;

            ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
            ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

            server_name your-domain.com www.your-domain.com;

            location /api/ {
                    proxy_pass http://127.0.0.1:8000$uri$is_args$args;
            }

            location /ws/ {
                    proxy_pass http://127.0.0.1:8000$uri$is_args$args;
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
                    proxy_read_timeout 86400;

            }

            location / {
                    root /var/www/your-domain.com/html;
                    index index.html index.htm;
                    try_files $uri /index.html;
            }
    }
    ```
4. Enable and test configuration:
    ```
    nginx -t
    service nginx restart
    ```

## License

The project is available as open source under the terms of the [MIT License](/LICENSE)