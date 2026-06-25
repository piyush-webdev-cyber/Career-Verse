from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    cors_origins: str = (
        "http://localhost:5173,"
        "http://127.0.0.1:5173,"
        "https://career-verse-one.vercel.app"
    )
    frontend_url: str = "https://career-verse-one.vercel.app"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
