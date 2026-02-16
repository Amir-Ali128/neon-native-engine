extern "C" {

static int score = 0;

void increase_score() {
    score++;
}

int get_score() {
    return score;
}

}
