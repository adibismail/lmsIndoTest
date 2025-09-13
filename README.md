# PostgreSQL Upgrade Simulation

A minimal application demonstrating PostgreSQL 12 to 17 upgrade scenarios.

## Quick Start

1. **Setup Database**
   ```bash
   cd docker
   docker-compose up -d postgres12
   ```

2. **Install Dependencies**
   ```bash
   npm run setup
   ```

3. **Start Application**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## Test Users
- admin/admin (full access)
- manager/manager (limited access)
- user/user (basic access)

## Database Migration Test

1. **Start PostgreSQL 17**
   ```bash
   docker-compose --profile upgrade up -d postgres17
   ```

2. **Migrate Data** (manual process for testing)
   ```bash
   pg_dump -h localhost -p 5432 -U postgres postgres_simulation > backup.sql
   psql -h localhost -p 5433 -U postgres postgres_simulation < backup.sql
   ```

3. **Update Backend Config**
   Change `DB_PORT=5433` in backend/.env

## Performance Testing
- Monitor query execution times in pg_stat_statements
- Compare dashboard load times between versions
- Test concurrent user scenarios