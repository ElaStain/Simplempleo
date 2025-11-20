from routes.company_routes import company_bp

# Después de tus otras importaciones, añade:
app.register_blueprint(company_bp)