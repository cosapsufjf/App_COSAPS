// hooks/useSleepForm.ts
import { useState, useCallback } from "react";
import { sendData as sendToBackend } from "./ChartData";

export enum SleepFormType {
  Time = "time",
  Duration = "duration",
}

interface UseSleepFormReturn {
  valuesTime: { hour: string; min: string };
  valuesDuration: { hour: string; min: string };
  selectedDay: any | undefined;
  saving: boolean;
  error: Error | null;
  
  setValues: (type: SleepFormType, hour: string, min: string) => void;
  setSelectedDay: React.Dispatch<React.SetStateAction<any | undefined>>;
  save: () => Promise<void>;
  reset: () => void;
}

export function useSleepForm(): UseSleepFormReturn {
  const [valuesTime, setValuesTime] = useState({ hour: "", min: "" });
  const [valuesDuration, setValuesDuration] = useState({ hour: "", min: "" });
  const [selectedDay, setSelectedDay] = useState<any | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setValues = useCallback((
    type: SleepFormType, 
    hour: string, 
    min: string
  ) => {
    switch (type) {
      case SleepFormType.Time:
        setValuesTime({ hour, min });
        break;
      case SleepFormType.Duration:
        setValuesDuration({ hour, min });
        break;
    }
  }, []);

  const reset = useCallback(() => {
    setValuesTime({ hour: "", min: "" });
    setValuesDuration({ hour: "", min: "" });
    setSelectedDay(undefined);
    setError(null);
  }, []);

  const save = useCallback(async () => {
    if (!selectedDay) {
      setError(new Error("Selecione um dia"));
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await sendToBackend(
        selectedDay,
        valuesTime,
        valuesDuration,
        () => {},
        () => {}
      );
      reset();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Falha ao salvar"));
    } finally {
      setSaving(false);
    }
  }, [selectedDay, valuesTime, valuesDuration, reset]);

  return {
    valuesTime,
    valuesDuration,
    selectedDay,
    saving,
    error,
    setValues,
    setSelectedDay,
    save,
    reset,
  };
}