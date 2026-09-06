export interface TimerProps {
  target_time: number;
  set_number: number;
  onComplete: () => void;
}