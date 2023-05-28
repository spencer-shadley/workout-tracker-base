import { isFirstTime } from '@/hooks/storage/useLocalStorage';

import Steps from '../home-stepper/Steps';
import Welcome from '../welcome/Welcome';

const shouldShowWelcome = isFirstTime();

export default function Main() {
  return shouldShowWelcome ? <Welcome /> : <Steps />;
}
