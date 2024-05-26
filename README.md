1) Create a Postgree database called "service-api"
2) run the comand "npm run db:migrate" for drizzle to make the migrations
3) run npm run dev --> enjoy
4) npm run test ---> for testing with JEST.js

End points
Auth
/api/auth/register	  POST	Registrar un nuevo usuario. Recibe username, email, password.
/api/auth/login	      POST	Iniciar sesión de un usuario. Recibe email, password. Devuelve un token JWT.
/api/auth/logout	    POST	Cerrar sesión de un usuario. Invalida el token JWT.
			
user	
/api/users/me	        GET	Obtener la información del usuario autenticado.
			
Timeslots	

/api/timeslots	      GET	Obtener todos los horarios disponibles.
/api/timeslots/:id	  GET	Obtener un horario específico.
/api/timeslots	      POST	Crear un nuevo horario (solo staff). Recibe date, start_time, end_time, available.
/api/timeslots/:id	  PUT	Actualizar un horario existente (solo staff).
/api/timeslots/:id	  DELETE	Eliminar un horario (solo staff).
			
Reservations	

/api/reservations	        GET	Obtener todas las reservas del usuario autenticado.
/api/reservations/:id	    GET	Obtener una reserva específica del usuario autenticado.
/api/reservations	        POST	Crear una nueva reserva. Recibe time_slot_id, number_of_people.
/api/reservations/:id	    PUT	Actualizar una reserva existente (usuario o staff).
/api/reservations/:id	    DELETE	Cancelar una reserva (usuario o staff).

.env

PORT= To use
ALLOWED_ORIGIN= page for cors
DATABASE_URL=postgres://postgres:XXXXXX@xxxx/service-api
SECRET_KEY=xxxxxxx
JWT_SECRET=xxxxxxxxxxxxx
