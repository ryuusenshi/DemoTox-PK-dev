/*
	Runge-Kutta 4 ODE solver adapted from: https://jurasic.dev/ode/scripts/ode.js
*/
class ODEsolver {
    constructor(ode, y0, t0, t1) {
        this.ode = ode
        this.y0 = y0
        this.t0 = t0
        this.t1 = t1
    }

    rk4(resolution, valueCallback) {
        const h = (this.t1 - this.t0) / resolution
        var ts = Array.from(Array(resolution + 1), (_, k) => k * h + this.t0)
        var ys = Array.from(Array(resolution + 1), () => Array(this.y0.length).fill(0))
        ys[0] = this.y0
        
        for (let i = 0; i < resolution; i++) {
            const k1 = this.ode(ts[i], ys[i]) // f(t, y_n)

            const s1 = ys[i].map((y, j) => y + k1[j] * h / 2)
            const k2 = this.ode(ts[i] + h / 2, s1) // f(t + h/2, y_n + k1*h/2)

            const s2 = ys[i].map((y, j) => y + k2[j] * h / 2)
            const k3 = this.ode(ts[i] + h / 2, s2) // f(t + h/2, y_n + k2*h/2)

            const s3 = ys[i].map((y, j) => y + k3[j] * h)
            const k4 = this.ode(ts[i] + h, s3) // f(t + h, y_n + k3*h)
            
            const addValue = valueCallback(i);
            ys[i] = ys[i].map((x, j) => x + addValue[j]);
            
            ys[i + 1] = ys[i].map((x, j) => x + (k1[j] / 6 + k2[j] / 3 + k3[j] / 3 + k4[j] / 6) * h) //y_n+1 = y_n + (k1 +2*k2 + 2*k3 +k4)/6 *h
        }
        return {
            ts: ts,
            ys: ys
        }
    }
}
