export type EventFormValues = {
  title: string;
  type: string;
  date: string;
  location: string;
  image: string;
  description: string;
};

export type EventFormErrors = Partial<Record<keyof EventFormValues, string>>;

export const toISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/** Local "today" as YYYY-MM-DD. */
export const getTodayISO = () => toISODate(new Date());

/** Earliest date an event may be published on: tomorrow. */
export const getMinEventDateISO = () => {
  const now = new Date();
  return toISODate(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
};

const EMAIL_URL_PATTERN = /^https?:\/\/\S+$/i;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function validateEvent(values: EventFormValues): EventFormErrors {
  const errors: EventFormErrors = {};
  const title = values.title.trim();
  const location = values.location.trim();
  const image = values.image.trim();
  const description = values.description.trim();

  if (!title) {
    errors.title = "Give your event a clear title.";
  } else if (title.length < 4) {
    errors.title = "Title must be at least 4 characters.";
  } else if (title.length > 120) {
    errors.title = "Keep the title under 120 characters.";
  }

  if (!values.type.trim()) {
    errors.type = "Select the type of event.";
  }

  if (!values.date) {
    errors.date = "Choose a date for your event.";
  } else if (!ISO_DATE_PATTERN.test(values.date) || Number.isNaN(new Date(values.date).getTime())) {
    errors.date = "Enter a valid date.";
  } else if (values.date <= getTodayISO()) {
    errors.date = "The date must be in the future.";
  }

  if (!location) {
    errors.location = "Add a venue or location.";
  } else if (location.length < 3) {
    errors.location = "Location must be at least 3 characters.";
  }

  if (!image) {
    errors.image = "Add a thumbnail image URL.";
  } else if (!EMAIL_URL_PATTERN.test(image)) {
    errors.image = "Use a valid image URL starting with http:// or https://.";
  }

  if (!description) {
    errors.description = "Describe what volunteers should expect.";
  } else if (description.length < 20) {
    errors.description = "Description must be at least 20 characters.";
  } else if (description.length > 600) {
    errors.description = "Keep the description under 600 characters.";
  }

  return errors;
}
