const jwttoken = ()=>{ jwt.sign({ email: user.email, role: user.role },
              process.env.JWT_SECRET,
             { expiresIn: "1h" });
}

export { jwttoken };