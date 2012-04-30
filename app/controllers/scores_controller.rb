class ScoresController < ApplicationController
  # GET /scores
  # GET /scores.json
  def index
    @scores = Score.find(:all, order: "points")

    respond_to do |format|
      format.json { render json: @scores }
      format.js  { render json: @scores, callback: params[:callback] }
    end
  end

  # POST /scores
  # POST /scores.json
  def create
    @score = Score.new(params)
    Rails.logger.info params
    respond_to do |format|
      if @score.save
        format.json { render json: @score, status: :created, location: @score }
      else
        format.json { render json: @score.errors, status: :unprocessable_entity }
      end
    end
  end
end
