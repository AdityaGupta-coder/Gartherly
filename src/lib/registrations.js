const REGISTRATIONS_KEY = "gatherly.demo.registrations";

function readRegistrations() {
  const raw = window.localStorage.getItem(REGISTRATIONS_KEY);
  if (raw === null) return [];

  let registrations;
  try {
    registrations = JSON.parse(raw);
  } catch {
    throw new Error("Saved registrations are invalid. Clear this site's browser data and try again.");
  }
  if (!Array.isArray(registrations)) {
    throw new Error("Saved registrations are invalid. Clear this site's browser data and try again.");
  }
  return registrations;
}

function saveRegistrations(registrations) {
  window.localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
}

export function getUserRegistrations(userId) {
  return readRegistrations().filter((registration) => registration.userId === userId);
}

export function addRegistration({ userId, event, name, email, phone }) {
  const registrations = readRegistrations();
  if (
    registrations.some(
      (registration) =>
        registration.userId === userId && registration.eventId === event.id,
    )
  ) {
    throw new Error("You are already registered for this event.");
  }

  const registration = {
    id: crypto.randomUUID(),
    userId,
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    eventTime: event.time,
    eventVenue: event.venue,
    eventImage: event.image,
    name,
    email,
    phone,
    createdAt: new Date().toISOString(),
  };
  registrations.push(registration);
  saveRegistrations(registrations);
  return registration;
}

export function cancelRegistration(registrationId, userId) {
  const registrations = readRegistrations();
  const registration = registrations.find(
    (item) => item.id === registrationId && item.userId === userId,
  );
  if (!registration) {
    throw new Error("This registration was not found or has already been cancelled.");
  }

  saveRegistrations(
    registrations.filter((item) => item.id !== registrationId),
  );
  return registration;
}
