class ScoresController < ApplicationController
  # GET /scores
  # GET /scores.json
  def index
    @scores = Score.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @scores }
    end
  end

  # GET /scores/1
  # GET /scores/1.json
  def show
    @score = Score.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @score }
    end
  end

  # GET /scores/new
  # GET /scores/new.json
  def new
    @score = Score.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @score }
    end
  end

  # POST /scores
  # POST /scores.json
  def create
    @score = Score.new(params[:score])

    respond_to do |format|
      if @score.save
        format.html { redirect_to @score, notice: 'Score was successfully created.' }
        format.json { render json: @score, status: :created, location: @score }
      else
        format.html { render action: "new" }
        format.json { render json: @score.errors, status: :unprocessable_entity }
      end
    end
  end
end
