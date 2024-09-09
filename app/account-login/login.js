class EntryCover {
    static coverState = 0;

    static stateSwitch() {
        try {
            let entryCover = document.getElementById("entryCover");  
            let coverHeader = document.getElementById("coverHeader");
            let coverButton = document.getElementById("coverButton");

            if (this.coverState == 0) {
                entryCover.classList.add("cover-signup");
                coverHeader.textContent = "Existing Member?";
                coverButton.textContent = "Login Here";
                this.coverState = 1;
            } else {
                entryCover.classList.remove("cover-signup");
                coverHeader.textContent = "New to Boxed Eats?";
                coverButton.textContent = "Signup Here";
                this.coverState = 0;
            }
        } catch (e) {
            throw(e);
        }
    }
}