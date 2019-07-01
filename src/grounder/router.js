import { GrounderBetting } from '../model/common/Lottery'
import GrounderMatch from '@/grounder/view/betting/GrounderMatch'

export default [
  {
    path: '/grounder_betting',
    name: GrounderBetting,
    component: GrounderMatch
  }
]
