import { EVENT_CATEGORIES } from "./types";
import Field, { fieldInputClass } from "@/components/Field";
import Button from "@/components/Button";

type EventFormValues = {
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  url?: string;
  submittedBy?: string;
};

type EventFormProps = {
  action: string | ((formData: FormData) => void | Promise<void>);
  method?: "POST";
  defaultValues?: EventFormValues;
  hiddenId?: string;
  submitLabel: string;
  error?: string;
};

export default function EventForm({
  action,
  method,
  defaultValues = {},
  hiddenId,
  submitLabel,
  error,
}: EventFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      action={action}
      method={typeof action === "string" ? method ?? "POST" : undefined}
      className="space-y-5"
    >
      {hiddenId && <input type="hidden" name="id" value={hiddenId} />}

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <Field
        label="Event name"
        name="title"
        required
        defaultValue={defaultValues.title}
        placeholder="George Street Festival"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Field
          label="Date"
          name="date"
          type="date"
          required
          min={today}
          defaultValue={defaultValues.date}
        />
        <Field
          label="Start time"
          name="startTime"
          type="time"
          defaultValue={defaultValues.startTime}
        />
        <Field
          label="End time"
          name="endTime"
          type="time"
          defaultValue={defaultValues.endTime}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Category">
          <select
            name="category"
            defaultValue={defaultValues.category ?? "Music"}
            className={fieldInputClass}
          >
            {EVENT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Location"
          name="location"
          defaultValue={defaultValues.location}
          placeholder="George Street, St. John's"
        />
      </div>

      <Field label="Details">
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues.description}
          placeholder="What's happening, what to expect, cost..."
          className={fieldInputClass}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Link (optional)"
          name="url"
          type="url"
          defaultValue={defaultValues.url}
          placeholder="https://..."
        />
        <Field
          label="Your name (optional)"
          name="submittedBy"
          defaultValue={defaultValues.submittedBy}
        />
      </div>

      <Button type="submit" fullWidth>
        {submitLabel}
      </Button>
    </form>
  );
}
