import { Github, Instagram } from 'lucide-react'

const quickLinks = ['Home', 'Services', 'Work', 'Pricing', 'Contact']
const services = ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing', 'Automation']

export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.6)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                    <div className="max-w-xs">
                        <a href="#" className="mb-3 block">
                            <span className="text-2xl font-black tracking-tight gradient-text">RTUROX</span>
                        </a>
                        <p className="body-md text-[#404040] mb-4">
                            Coimbatore-based tech studio building websites, apps, and automation for businesses that want to grow.
                        </p>
                        <div className="flex items-center gap-3">
                            {[
                                { href: 'https://github.com/sivamathavan', icon: Github },
                                { href: 'https://wa.me/6381169124', icon: null },
                                { href: 'https://www.instagram.com/rturox_tech', icon: Instagram },
                            ].map(({ href, icon: Icon }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[#404040] hover:text-[#A855F7] transition-all duration-150"
                                    style={{ background: 'rgba(23,23,23,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    {Icon ? <Icon className="w-4 h-4" /> : (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="label-md text-white mb-4">Quick Links</h4>
                            <ul className="flex flex-col gap-2.5">
                                {quickLinks.map((link) => (
                                    <li key={link}><a href={`#${link.toLowerCase()}`} className="label-md text-[#404040] hover:text-[#A855F7] transition-colors duration-150">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="label-md text-white mb-4">Services</h4>
                            <ul className="flex flex-col gap-2.5">
                                {services.map((svc) => <li key={svc}><span className="label-md text-[#404040]">{svc}</span></li>)}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8"
                    style={{ background: 'rgba(168,85,247,0.04)', border: '1px solid rgba(168,85,247,0.1)' }}>
                    <div>
                        <p className="text-white font-medium text-sm">Ready to start your project?</p>
                        <p className="label-md text-[#404040] mt-0.5">Get a free demo for your industry in 24 hours.</p>
                    </div>
                    <a href="https://wa.me/6381169124" target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp Us
                    </a>
                </div>

                <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <p className="label-md text-[#404040]">© 2025 Rturox. All rights reserved.</p>
                    <p className="label-md text-[#404040]">Built in Coimbatore, India 🇮🇳</p>
                </div>
            </div>
        </footer>
    )
}
