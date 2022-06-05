// Load Fontawesome Icons //
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faBootstrap, faSass, faLaravel } from '@fortawesome/free-brands-svg-icons'
import { faCube } from '@fortawesome/pro-thin-svg-icons'

library.add(faBootstrap, faSass, faCube, faLaravel)

dom.watch()
